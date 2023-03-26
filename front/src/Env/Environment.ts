class Environment
{
    static apiUrlData : string;
    static apiUrlDataAction : string;
    static apiUrlDataUser : string;
}

export async function updateEnvironment() {
    const resData = await fetch(`${process.env.PUBLIC_URL}/configuration.json`);
    const json =await resData.json();
    
    Environment.apiUrlData = json.apiUrlData;

    Environment.apiUrlDataAction = json.apiUrlDataAcions;

    Environment.apiUrlDataUser = json.apiUrlDataUser;
}

export default Environment;
