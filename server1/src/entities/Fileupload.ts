import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Contracts} from "./Contracts";
import { Users } from "./Users";


@Entity("Fileupload",{schema:"contract" } )
@Index("contractId",["contract",])
export class Fileupload {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>Contracts, contracts=>contracts.fileuploads,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'contractId'})
    contract:Contracts | null;

    @ManyToOne(type=>Users, users=>users.contractss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'userId'})
    createdBy:Users | null;



    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"fieldname"
        })
    fieldname:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"originalname"
        })
    originalname:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"encoding"
        })
    encoding:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"mimetype"
        })
    mimetype:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"destination"
        })
    destination:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"filename"
        })
    filename:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"path"
        })
    path:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"size"
        })
    size:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"createdAt"
        })
    createdAt:Date | null;
        
}
