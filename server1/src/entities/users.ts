import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("users",{schema:"contract-tracker" } )
@Index("name",["name",],{unique:true})
export class users {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        name:"name"
        })
    name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"email"
        })
    email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"password"
        })
    password:string | null;
        

    @Column("datetime",{ 
        nullable:false,
        name:"createdAt"
        })
    createdAt:Date;
        

    @Column("datetime",{ 
        nullable:false,
        name:"updatedAt"
        })
    updatedAt:Date;
        
}
