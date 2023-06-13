import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Employee {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
    Employeename: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column({unique:true})
    email:string;

    @Column()
    address: string;

    @Column()
    position: string;

    @Column()
    salary: number;

    @Column()
    status: string;

    @Column({default: true})
    isActive: boolean;
   
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    created_by: string;

    @UpdateDateColumn({nullable: true})
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;

}

