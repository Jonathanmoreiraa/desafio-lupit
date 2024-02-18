import Swal from "sweetalert2";

export async function getData(rotas: string) {
    const response = await fetch(`http://localhost:3001/${rotas}`);
    const data = await response.json();
    return data;
}

export async function postData(rotas: string, data : string) {
    try {
        const response = await fetch(`http://localhost:3001/${rotas}`, {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro);
        }else{
            return response;
        }
    } catch (error) {
        Swal.fire({
            title: "Erro!",
            text: `Não conseguimos cadastrar o jogador, tente novamente mais tarde.`,
            icon: "warning",
        })
    }
}

export async function editData(rotas: string, data : string) {
    try {
        const response = await fetch(`http://localhost:3001/${rotas}`, {
            method: "PUT",
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro);
        }else{
            return response;
        }
    } catch (error) {
        Swal.fire({
            title: "Erro!",
            text: `Não conseguimos editar o jogador, tente novamente mais tarde.`,
            icon: "warning",
        })
    }
}

export async function deleteData(rotas: string) {
    const response = await fetch(`http://localhost:3001/${rotas}`, {
        method: "DELETE"
    });
    const responseReturn = await response.json();
    return responseReturn;
}
  
  
  