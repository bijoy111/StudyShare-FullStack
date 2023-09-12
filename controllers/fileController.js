const dbServices = require('../db/dbServices.js');
const dbFile = require('../db/dbFile.js');
const { check } = require('express-validator');

exports.fileViewGetController= async (req,res,next)=>
{
    if(req.user===null) 
    {
        message='Please login First!';
        res.redirect('back');
    }
    else
    {
      let courses= await dbServices.getCoursesByStudentID(req.user.id);
        //fileInfos = dbServices.getFileInfosOfCourse();
        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
            course.materials = await dbServices.getMaterialsByCourseID(course.Course.id);
          }
          console.log(courses);
          res.render('File/uploadForm.ejs',{course_id:req.params.course_id});
    }
    
}
exports.fileViewPostController= async (req,res,next)=>
{
  console.log('fileview Post cntrlr');
  console.log(req.params);
   
      let materials = await dbServices.getMaterialsByCourseID(req.params.course_id);
     // console.log(materials);
     let materialList=[];
        for(let i=0;i<materials.length;i++)
        {
          let material = {
            name :materials[i].name,
            owner : materials[i].owner,
            type : materials[i].type,
            rating: materials[i].rating,
            link: materials[i].link,
            description: materials[i].description,
            created_at: materials[i].created_at
          }
          materialList.push(material);
        }
        if(req.body.sortby&&req.body.sortby=='recentlyUploaded')
        {
          console.log('Sortby '+req.body);
         
          materialList.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
          
            // Compare the dates first
            if (dateA.getTime() > dateB.getTime()) return -1; // dateA is more recent
            if (dateA.getTime() < dateB.getTime()) return 1;  // dateB is more recent
          
            return 0;
          });
          
          materialList.forEach(m=>{
            console.log(m.name+'  '+m.created_at);
          });
        }
        res.render('File/material.ejs',{materialList: materialList,course_id:req.params.course_id});
      //res.render('basic/download.ejs',{supabaseFileURL:'https://simiinrgqhqtxgifwdzw.supabase.co/storage/v1/object/public/File/uploads/IPC-week-4-5-RRR.pptx?t=2023-09-10T15%3A41%3A11.498Z'});
       
  console.log(req.body);
}
exports.fileUploadGetController= async (req,res,next)=>
{
   
    
console.log('UploadGet--');
console.log(req.body);
  
    if(req.user===null) 
    {
        message='Please login First!';
        res.redirect('back');
    }
    else {
      res.render('File/uploadForm.ejs',{course_id:req.params.course_id});
    }
}

exports.fileUploadPostController= async (req,res,next)=>
{
   
    console.log('upload post request');
console.log(req.body);
    if(req.user===null) 
    {
        message='Please login First!';
        res.redirect('back');
    }
    else {
        if (!req.file) {
            const message = 'No file was uploaded!';
            
            return res.redirect('back');
          }
          else
          {

            console.log(req.body);
            console.log('upload req');
            const materialInfo = {
              course_id: req.body.course_id,
              name: req.file.originalname,
              type: req.body.type,
              tag: req.body.tag,
              rating: 9.5,
              uploader_id:1,
              owner: req.body.owner,
              description:req.body.description,
              created_at: new Date(),
            };
            const { success, data, error } = await dbFile.uploadFileToSupabase(req.file,materialInfo);
            if (success) {
              
              //alert('File uploaded successfully');
               // return res.status(200).json({ message: 'File uploaded successfully' });
               // res.redirect('back');
              // res.render('File/uploadForm.ejs',{course_id:req.params.course_id});
              } else {
                //alert(JSON.stringify({ error: 'Error uploading file to Supabase', details: error }));
               // res.redirect('back');
               // return res.status(500).json({ error: 'Error uploading file to Supabase', details: error });
              // res.render('File/uploadForm.ejs',{course_id:req.params.course_id});
              }
              let materials = await dbServices.getMaterialsByCourseID(req.params.course_id);
              // console.log(materials);
              let materialList=[];
                 for(let i=0;i<materials.length;i++)
                 {
                   let material = {
                     name :materials[i].name,
                     owner : materials[i].owner,
                     type : materials[i].type,
                     rating: materials[i].rating,
                     link: materials[i].link,
                     description: materials[i].description,
                     created_at: materials[i].created_at
                   }
                   materialList.push(material);
                 }
                
                 res.render('File/material1.ejs',{materialList: materialList,course_id:req.params.course_id});
               //res.render('basic/download.ejs',{supabaseFileURL:'https://simiinrgqhqtxgifwdzw.supabase.co/storage/v1/object/public/File/uploads/IPC-week-4-5-RRR.pptx?t=2023-09-10T15%3A41%3A11.498Z'});
                
           console.log(req.body);
          }

    }
}

exports.fileDownloadGetController= async (req,res,next)=>
{
   
    

  
    if(req.user===null) 
    {
        message='Please login First!';
        res.redirect('back');
    }
    else {
      res.render('basic/download.ejs',{supabaseFileURL:'https://simiinrgqhqtxgifwdzw.supabase.co/storage/v1/object/public/File/uploads/IPC-week-4-5-RRR.pptx?t=2023-09-10T15%3A41%3A11.498Z'});
    }
}
exports.fileDownloadPostController= async (req,res,next)=>
{
    if(req.user===null) 
    {
        message='Please login First!';
        res.redirect('back');
    }
    else {
      console.log('download post');
      res.render('basic/download.ejs',{supabaseFileURL:'https://simiinrgqhqtxgifwdzw.supabase.co/storage/v1/object/public/File/uploads/IPC-week-4-5-RRR.pptx?t=2023-09-10T15%3A41%3A11.498Z'});
    }
}