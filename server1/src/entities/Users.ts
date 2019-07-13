import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Contracts} from "./Contracts";
import bcrypt from 'bcryptjs'


@Entity("Users",{schema:"contracts" } )
export class Users {

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
        name:"email"
        })
    email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"password"
        })
    password:string | null;
        

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
        

   
    @OneToMany(type=>Contracts, contracts=>contracts.createdBy,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    contractss:Contracts[];
    

   
    @OneToMany(type=>Contracts, contracts=>contracts.responsible,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    contractss2:Contracts[];

    /**
     * comparePassword
     */
    public comparePassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}
