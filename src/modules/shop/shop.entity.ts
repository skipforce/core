import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@ObjectType()
@Entity('shops')
export class Shop extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 30, nullable: true })
    name: string

    @Field({ nullable: true })
    @Column({ type: 'varchar', nullable: true })
    description: string

    @Field({ nullable: true })
    @Column({ type: 'varchar', default: 'INACTIVE', nullable: true })
    status: string

    @Field(type => [Product], { nullable: true })
    @OneToMany(type => Product, product => product.shop, { onDelete: 'CASCADE' })
    products: Product[]

    @Field(type => User)
    @OneToOne(type => User, user => user.shop, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User
}
