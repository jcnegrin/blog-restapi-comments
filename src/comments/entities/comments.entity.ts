/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { Posts } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comments {
    
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({type: 'longtext'})
    content: string;

    @CreateDateColumn()
    createdAt: number;

    @ManyToOne(
        type => Posts,
        post => post.id
    )
    @JoinTable()
    post: Posts;

    @ManyToOne(
        type => User,
        user => user.id
    )
    @JoinTable()
    user: User;
}