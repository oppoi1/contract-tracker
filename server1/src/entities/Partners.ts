import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {Companies} from "./Companies";
import {Contracts} from "./Contracts";


@Entity("Partners",{schema:"contracts" } )
@Index("companyId",["company",])
export class Partners {

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
        length:30,
        name:"branch"
        })
    branch:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"phone"
        })
    phone:string | null;
        

   
    @ManyToOne(type=>Companies, companies=>companies.partnerss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'companyId'})
    company:Companies | null;


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
        

   
    @OneToMany(type=>Contracts, contracts=>contracts.partner,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    contractss:Contracts[];
    


    @Column()
    isActive: Boolean
}
