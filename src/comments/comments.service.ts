import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { project: projectId, author, content } = createCommentDto;
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project)
      return { success: false, message: '프로젝트를 찾을 수 없습니다.' };
    const comment = this.commentRepository.create({
      project,
      author,
      content,
    });
    await this.commentRepository.save(comment);
    return { success: true, message: '댓글이 성공적으로 저장되었습니다.' };
  }

  async findAll() {
    const allComments = await this.commentRepository.find({
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
    console.log(allComments);
    return {
      success: true,
      message: '댓글이 성공적으로 조회되었습니다.',
      data: allComments,
    };
  }

  async findOne(id: number) {
    const targetComment = await this.commentRepository.findOne({
      where: { id },
      order: { createdAt: 'DESC' },
    });
    if (!targetComment)
      return { success: false, message: '댓글을 찾을 수 없습니다.' };
    return {
      success: true,
      message: '댓글이 성공적으로 조회되었습니다.',
      data: targetComment,
    };
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { author, content } = updateCommentDto;
    const targetComment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!targetComment)
      return { success: false, message: '댓글을 찾을 수 없습니다.' };
    targetComment.author = author ?? targetComment.author;
    targetComment.content = content ?? targetComment.content;
    await this.commentRepository.save(targetComment);
    return { success: true, message: '댓글이 성공적으로 수정되었습니다.' };
  }

  async remove(id: number) {
    const targetComment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!targetComment)
      return { success: false, message: '댓글을 찾을 수 없습니다.' };
    await this.commentRepository.remove(targetComment);
    return { success: true, message: '댓글이 성공적으로 삭제되었습니다.' };
  }
}
