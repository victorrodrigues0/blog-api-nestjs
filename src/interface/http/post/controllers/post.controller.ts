import { CreatePostUseCase } from '@application/usecases/post/create-post.usecase';
import { DeletePostUseCase } from '@application/usecases/post/delete-post.usecase';
import { GetPostByIdUseCase } from '@application/usecases/post/get-post-by-id.usecase';
import { ListPostsUseCase } from '@application/usecases/post/list-posts.usecase';
import { UpdatePostUseCase } from '@application/usecases/post/update-post.usecase';
import { CreatePostDto } from '@interface/dtos/post/create-post.dto';
import { UpdatePostDto } from '@interface/dtos/post/update-post.dto';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';

@Controller('posts')
export class PostController {

    constructor(
        private readonly createPost: CreatePostUseCase,
        private readonly updatePost: UpdatePostUseCase,
        private readonly deletePost: DeletePostUseCase,
        private readonly getPostById: GetPostByIdUseCase,
        private readonly listPosts: ListPostsUseCase,
    ) { }

    @UseGuards(AuthGuard)
    @Post("/create")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreatePostDto, @Req() req: Request) {
        const user = req['user'];

        data = {
            ...data,
            user_id: user['id']
        }

        return this.createPost.execute(data);
    }

    @Get("/")
    @HttpCode(HttpStatus.OK)
    async list() {
        return this.listPosts.execute();
    }

    @UseGuards(AuthGuard)
    @Put("/update/:id")
    @HttpCode(HttpStatus.OK)
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() data: UpdatePostDto, @Req() req: Request) {
        const user = req['user'];

        data = {
            ...data,
            user_id: user['id']
        }

        return this.updatePost.execute(id, data);
    }


    @UseGuards(AuthGuard)
    @Delete("/delete/:id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.deletePost.execute(id);
    }

    @UseGuards(AuthGuard)
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id', new ParseIntPipe()) id: number) {
        return this.getPostById.execute(id);
    }

}
