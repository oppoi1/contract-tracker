import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {companies} from "./companies";
import {contracts} from "./contracts";


@Entity("partners",{schema:"contract-tracker" } )
@Index("CompanyId",["company",])
export class partners {

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
        name:"branch"
        })
    branch:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"phone"
        })
    phone:string | null;
        

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
        

   
    @ManyToOne(type=>companies, companies=>companies.partnerss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'CompanyId'})
    company:companies | null;


   
    @OneToMany(type=>contracts, contracts=>contracts.partner,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    contractss:contracts[];
    
}
