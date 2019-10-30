import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Users} from "./Users";
import {Categories} from "./Categories";
import {Partners} from "./Partners";
import {Companies} from "./Companies";
import {Fileupload} from "./Fileupload";


@Entity("Contracts",{schema:"contracts" } )
@Index("createdBy",["createdBy",])
@Index("responsible",["responsible",])
@Index("categoryId",["category",])
@Index("partnerId",["partner",])
@Index("companyId",["company",])
export class Contracts {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:75,
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
        name:"end"
        })
    end:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"duration"
        })
    duration:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"objectives"
        })
    objectives:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"futureobjectives"
        })
    futureobjectives:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"other"
        })
    other:string | null;
        

   
    @ManyToOne(type=>Users, users=>users.contractss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'createdBy'})
    createdBy:Users | null;


    @Column("int",{ 
        nullable:true,
        name:"pricePerMonth"
        })
    pricePerMonth:number | null;
        
    @Column("int",{ 
        nullable:true,
        name:"pricePerPeriod"
        })
    pricePerPeriod:number | null;
   
    @ManyToOne(type=>Users, users=>users.contractss2,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'responsible'})
    responsible:Users | null;


    @Column("int",{ 
        nullable:true,
        name:"cancel"
        })
    cancel:number | null;
        

   
    @ManyToOne(type=>Categories, categories=>categories.contractss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'categoryId'})
    category:Categories | null;


   
    @ManyToOne(type=>Partners, partners=>partners.contractss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'partnerId'})
    partner:Partners | null;


   
    @ManyToOne(type=>Companies, companies=>companies.contractss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
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
        

    @Column("tinyint",{ 
        nullable:true,
        width:1,
        name:"isActive"
        })
    isActive:boolean | null;
        

   
    @OneToMany(type=>Fileupload, fileupload=>fileupload.contract,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    fileuploads:Fileupload[];
    
}