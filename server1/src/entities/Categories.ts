import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Contracts} from "./Contracts";


@Entity("Categories",{schema:"contracts" } )
export class Categories {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"name"
        })
    name:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"createdAt"
        })
    createdAt:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"updatedAt"
        })
    updatedAt:Date | null;
        

   
    @OneToMany(type=>Contracts, contracts=>contracts.category,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    contractss:Contracts[];
    
}
