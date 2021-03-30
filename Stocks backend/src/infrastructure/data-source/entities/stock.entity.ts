import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public description: string;

  @Column()
  public currentPrice: number;

  @Column()
  public startPrice: number;

  @Column()
  public startDate: string;
}

export default StockEntity;
