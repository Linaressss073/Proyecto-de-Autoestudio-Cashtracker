import { Table , Column , Model , DataType , ForeignKey , BelongsTo, AllowNull} from 'sequelize-typescript';
import Budget from './Budget';

@Table({
    tableName:'expenses'
})

class Expense extends Model{
    @AllowNull(false)
    @Column({
        type:DataType.STRING(100)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type:DataType.DECIMAL(10,2)
    })
    declare amount: number

    //Llaves foraneas

    @ForeignKey(() => Budget)
    declare budgetId: number

    //Relaciones
    @BelongsTo(() => Budget)
    declare budget: Budget

}

export default Expense;