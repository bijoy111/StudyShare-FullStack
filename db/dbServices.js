const { supabase } = require('../main.js');


async function getCoursesByStudentID(stId){
    
    const { data, error } = await supabase
    .from('Enrollment')
    .select('Course(id,course_name,Level,Term)')
    .eq('student_id',stId)
    if(error)
    {
      console.log(error);
    }
    else
    {
      console.log('Service');
      console.log(data);
    }

  return data;
}
async function getMaterialsByCourseID(course_id){
  const { data, error } = await supabase
  .from('Material')
  .select('')
  .eq('course_id',course_id)
  if(error)
  {
    console.log(error);
  }
  else
  {
    console.log('Service ');
    console.log(course_id);
  
  }

return data;
}

async function getLoginInfoByID(uid){
    const { data, error } = await supabase
    .from('User')
    .select('id, UserName, Password')
    .eq('id',uid)
    

  if (error) {
    console.error('Error fetching data:', error.message);
    return ;
  }

  console.log('Users:', data);
  return data;
}

module.exports = {
   getCoursesByStudentID,
   getMaterialsByCourseID, 
}