import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class PhotoEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:500})
    name:string
    
    @Column('text')
    decsiption:string

    @Column()
    filename:string

    @Column()
    views:number    

    @Column()
    isPublished:boolean
    
}