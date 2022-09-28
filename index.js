exports.handler = async (event) => {
  const { default: fetch } = await import('node-fetch')
  const socModulesRegex = /^(CS|IS|BT)\d{4}[a-zA-Z]*/g
  const res = await fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
  const data = await res.json()
  const arr = []
  
  data.forEach(module => {
      const moduleCode = module.moduleCode
      const moduleTitle = module.title
      if (moduleCode.match(socModulesRegex)) {
        arr.push({code : moduleCode, title : moduleTitle})
      }
  });
  console.log(arr)
  
  const response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(arr),
  };
  
  return response
};
