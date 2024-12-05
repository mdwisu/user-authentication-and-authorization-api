import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
// import { RolesGuard } from '../guards/role.guard';
// import { Roles } from '../auth/decorators/role.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  @Get()
  @Roles('admin')
  getAllTasks() {
    return 'This is a protected route';
  }
}
