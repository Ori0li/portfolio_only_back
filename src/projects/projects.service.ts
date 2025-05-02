import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    await this.projectRepository.save(project);
    return {
      success: true,
      message: '프로젝트 생성 완료',
      statusCode: 201,
      data: project,
    };
  }

  async findAll() {
    const projects = await this.projectRepository.find();
    return {
      success: true,
      message: '모든 프로젝트 조회 성공',
      statusCode: 201,
      data: projects,
    };
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    return {
      success: true,
      message: '프로젝트 조회 성공',
      statusCode: 201,
      data: project,
    };
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }
    await this.projectRepository.update(id, updateProjectDto);
    return {
      success: true,
      message: '프로젝트 수정 완료',
      statusCode: 201,
      data: project,
    };
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }
    await this.projectRepository.delete(id);
    return {
      success: true,
      message: '프로젝트 삭제 완료',
      statusCode: 201,
      data: project,
    };
  }
}
