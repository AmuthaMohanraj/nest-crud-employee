import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {


  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

// create a new employee
 async create(bodyData: any) {
    console.log(bodyData);
    let data=await this.employeeRepository.save(bodyData);
    return data;
  }

  // find all employee
 async findAll() {
    return await this.employeeRepository.find({
      select:['Employeename','age','gender','isActive'],
      where:{isActive:true}
    });
  }

  // find one employee
 async findOne(id: number) {
   return await this.employeeRepository.findOne({where:{id}})
  }

  // update employee
 async update(id: number, bodyData: any) {
   await this.employeeRepository.update(id,bodyData)
  }

  // remove employee
 async remove(id: number) {
    await this.employeeRepository.softDelete(id)
    await this.employeeRepository.update(id,{isActive:false})
  }
}
