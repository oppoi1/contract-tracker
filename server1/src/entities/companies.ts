import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {contracts} from "./contracts";
import {partners} from "./partners";


@Entity("companies",{schema:"contract-tracker" } )
export class companies {

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
        

    @Column("varchar",{ 
        nullable:true,
        name:"address"
        })
    address:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"branch"
        })
    branch:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"phone"
        })
    phone:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"fax"
        })
    fax:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"contracts"
        })
    contracts:string | null;
        

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
        

   
    @OneToMany(type=>contracts, contracts=>contracts.company,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    contractss:contracts[];
    

   
    @OneToMany(type=>partners, partners=>partners.company,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    partnerss:partners[];
    
}
