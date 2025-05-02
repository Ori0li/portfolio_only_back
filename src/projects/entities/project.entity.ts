import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  github: string;

  @Column({ type: 'varchar', length: 255 })
  demo: string;

  @Column('simple-array')
  tag: string[];

  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];
}
