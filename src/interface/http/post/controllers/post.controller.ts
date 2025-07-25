import { CreatePostUseCase } from '@application/usecases/post/create-post.usecase';
import { DeletePostUseCase } from '@application/usecases/post/delete-post.usecase';
import { GetPostByIdUseCase } from '@application/usecases/post/get-post-by-id.usecase';
import { ListPostsUseCase } from '@application/usecases/post/list-posts.usecase';
import { UpdatePostUseCase } from '@application/usecases/post/update-post.usecase';
import { CreatePostDto } from '@infra/dtos/post/create-post.dto';
import { UpdatePostDto } from '@interface/dtos/post/update-post.dto';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { CustomFilesPostInterceptor } from '@interface/http/interceptors/post/multer/files-interceptor-post.interceptor';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Postagens | posts")
@Controller('posts')
export class PostController {

    constructor(
        private readonly createPost: CreatePostUseCase,
        private readonly updatePost: UpdatePostUseCase,
        private readonly deletePost: DeletePostUseCase,
        private readonly getPostById: GetPostByIdUseCase,
        private readonly listPosts: ListPostsUseCase,
    ) { }

    @ApiOperation({ summary: "Cria um post no sistema." })
    @ApiResponse({ status: 201, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Post("/create")
    @UseInterceptors(CustomFilesPostInterceptor('files', 10))
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() data: CreatePostDto,
        @Req() req: Request,
        @UploadedFiles() files: Express.Multer.File[]
    ) {

        const images = files.map(file => file.filename);

        const user = req['user'];

        data = {
            ...data,
            images: images,
            user_id: user['id']
        }

        return this.createPost.execute(data);
    }

    @ApiOperation({ summary: "Lista todos os posts do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Get("/")
    @HttpCode(HttpStatus.OK)
    async list() {
        return this.listPosts.execute();
    }

    @ApiOperation({ summary: "Lista todos os usuários do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Put("/update/:id")
    @UseInterceptors(CustomFilesPostInterceptor('files', 10))
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() data: UpdatePostDto,
        @Req() req: Request,
        @UploadedFiles() files: Express.Multer.File[]) {
        const user = req['user'];

        const images = files.map(file => file.filename);

        data = {
            ...data,
            images,
            user_id: user['id']
        }

        return this.updatePost.execute(id, data);
    }


    @ApiOperation({ summary: "Lista todos os usuários do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Delete("/delete/:id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.deletePost.execute(id);
    }

    @ApiOperation({ summary: "Lista todos os usuários do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id', new ParseIntPipe()) id: number) {
        return this.getPostById.execute(id);
    }

}
