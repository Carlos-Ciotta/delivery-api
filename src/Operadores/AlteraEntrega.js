import FormEntrega from "../Components/FormEntrega"

export default function InsereEntrega(){
    const form = FormEntrega('alterar');
    return(
        <div>
            {form}
        </div>
    )
}