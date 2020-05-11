import { BaseEntity , Entity, Column, ObjectIdColumn } from 'typeorm'
import { IsString, IsDefined } from 'class-validator';

@Entity()
export class Replace extends BaseEntity{

  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: string;

  @IsString()
  @IsDefined()
  @Column()
  name!: string;
}
