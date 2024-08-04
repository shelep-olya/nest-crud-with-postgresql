import { Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService){}

    @Post()
    create(@Body() post:FeedPost): Observable<FeedPost>{
        return this.feedService.createPost(post)
    }

    @Get()
    findAll(): Observable<FeedPost[]>{{
        return this.feedService.findAllPosts();
    }}

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() feedPost: FeedPost):Observable<UpdateResult>{
        return this.feedService.updatePost(id, feedPost)
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<FeedPost>{
        const postId = parseInt(id, 10)
        return this.feedService.getPost(postId);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult>{
        return this.feedService.deletePost(id);
    }
}

