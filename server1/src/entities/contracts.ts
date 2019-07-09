import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {partners} from "./partners";
import {categories} from "./categories";
import {companies} from "./companies";


@Entity("contracts",{schema:"contract-tracker" } )
@Index("PartnerId",["partner",])
@Index("CategoryId",["category2",])
@Index("CompanyId",["company",])
export class contracts {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        name:"number"
        })
    number:string | null;
        

    @Column("date",{ 
        nullable:true,
        name:"start"
        })
    start:string | null;
        

    @Column("date",{ 
        nullable:true,
        name:"duration"
        })
    duration:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"objectives"
        })
    objectives:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"futureobjectives"
        })
    futureobjectives:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"other"
        })
    other:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"createdBy"
        })
    createdBy:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"pricePerMonth"
        })
    pricePerMonth:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"responsible"
        })
    responsible:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"cancel"
        })
    cancel:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"modifiedBy"
        })
    modifiedBy:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"category"
        })
    category:string | null;
        

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
        

   
    @ManyToOne(type=>partners, partners=>partners.contractss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'PartnerId'})
    partner:partners | null;


   
    @ManyToOne(type=>categories, categories=>categories.contractss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'CategoryId'})
    category2:categories | null;


   
    @ManyToOne(type=>companies, companies=>companies.contractss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'CompanyId'})
    company:companies | null;

}
