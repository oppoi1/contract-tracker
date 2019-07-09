import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {contracts} from "./contracts";


@Entity("categories",{schema:"contract-tracker" } )
export class categories {

  @PrimaryGeneratedColumn({
    type:"int", 
    name:"id"
    })
  id:number;
      

  @Column("varchar",{ 
    nullable:true,
    name:"name"
    })
  name:string | null;
      

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
      

  
  @OneToMany(type=>contracts, contracts=>contracts.category2,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
  contractss:contracts[];
  
}
