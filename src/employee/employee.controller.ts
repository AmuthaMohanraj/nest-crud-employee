import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
// import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Request, Response } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // createEmployee
  @Post('create')
  async create(@Req() req:Request, @Res() res:Response,@Body() bodyData:any) {
    try {
    await this.employeeService.create(bodyData).then((data)=>{
      res.status(200).json({
        status:200,
        message:"success",
      })
    })
    }
    catch (error) {
      res.status(400).json({
        status:400,
        message:"error",
        data:error
      })
    }
  }

// getAllEmployee
  @Get('getAllEmployee')
 async findAll(@Req() req:Request, @Res() res:Response) {
    try {
       let AllEmployee=await this.employeeService.findAll()
       res.status(HttpStatus.OK).json({
        message:'get All Employee Details',
        status:200,
        data:AllEmployee
       })
    }
    catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"error",
      })
    }
  }

  // getEmployeeById
  @Get('getEmployeeById/:id')
 async findOne(@Param('id') id:number ,@Req() req:Request,@Res() res:Response) {
   try {
    let employee= await this.employeeService.findOne(id);
    if(employee){
      res.status(HttpStatus.OK).json({
        message:'success',
      })
      return
    }
    res.status(HttpStatus.NOT_FOUND).json({
      message:'Not Found'
    })

   } catch (error) {
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:'error',
      err:error
     })
   }
  }

// updateEmployee
  @Put('updateEmployee/:id')
 async update(@Param('id') id: string, @Req() req:Request,@Res() res:Response, @Body() bodyData:any) {
   try {
    await  this.employeeService.update(+id,bodyData);
    res.status(HttpStatus.OK).json({
      message:'updated successful'
    })
   } catch (error) {
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:'errror',
      err:error
     })
   }
  }


@Delete('deleteEmployee/:id')
async  remove(@Param('id') id: string,@Req() req:Request, @Res() res:Response) {
  try {
    await this.employeeService.remove(+id);
    res.status(HttpStatus.OK).json({
      message:'deleted successful'
    })
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:'error',
      err:error
    })
  }
  }
}
