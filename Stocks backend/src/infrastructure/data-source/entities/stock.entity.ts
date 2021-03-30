import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockEntity {
  @PrimaryColumn({ unique: true })
  public id: string;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public description: string;

  @Column({ unique: true })
  public currentPrice: number;

  @Column({ unique: true })
  public startPrice: number;

  @Column({ unique: true })
  public startDate: string;
}

export default StockEntity;
