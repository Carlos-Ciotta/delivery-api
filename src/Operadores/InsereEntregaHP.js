import MenuBar from '../Components/MenuBar';
import DynamicTable from '../Components/Table';

export default function InsereEntrega(){
    const tabela = DynamicTable('http://localhost:5000/user/getall', 'geral');
    return(
        <div>
            <MenuBar />
            {tabela}
        </div>
    )
}