import MenuBar from '../Components/MenuBar';
import DynamicTable from '../Components/Table';

export default function InsereEntrega(){

    return(
        <div>
            <MenuBar />
            <DynamicTable URL='http://localhost:5000/user/getall' tipo={'geral'} />
        </div>
    )
}