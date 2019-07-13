import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Contracts} from "./Contracts";
import {Partners} from "./Partners";


@Entity("Companies",{schema:"contracts" } )
export class Companies {

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
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"address"
        })
    address:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"branch"
        })
    branch:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"phone"
        })
    phone:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"fax"
        })
    fax:string | null;
        

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
        

   
    @OneToMany(type=>Contracts, contracts=>contracts.company,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    contractss:Contracts[];
    

   
    @OneToMany(type=>Partners, partners=>partners.company,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    partnerss:Partners[];
    
}
