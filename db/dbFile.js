const { supabase } = require('../main.js');


async function uploadFileToSupabase(fileData,materialInfo) {
    const bucketName = 'File'; // Replace with your Supabase bucket name
    const filePath = `uploads/${fileData.originalname}`; // Specify the desired path in the bucket
  
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, fileData.buffer);
  
      if (error) {
        console.error('Error uploading file to Supabase:', error);
        return { success: false, error };
      }
      else
      {   
        console.log('upload succeeded');
        console.log(data);
         let rootPath = 'https://simiinrgqhqtxgifwdzw.supabase.co/storage/v1/object/public/File/';

        materialInfo.link=rootPath+data.path;
        console.log(materialInfo);
        const { insertData, insertError } = await supabase
          .from('Material')
          .upsert([materialInfo]); // Use 'upsert' to insert or update as needed
    
        if (insertError) {
          console.error('Error updating Material table:', insertError);
          return { success: false, error: insertError };
        }
      }
  
      console.log('File uploaded to Supabase:', data);
  
      // You can perform additional actions after a successful upload
      // For example, you can save metadata or update your database with the file information
  
      return { success: true, data };
    } catch (error) {
      console.error('Error handling file upload:', error);
      return { success: false, error };
    }
  }


module.exports = {
    uploadFileToSupabase,
    
}