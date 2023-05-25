import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {

  private readonly categoriesService: CategoriesService;

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  @Get()
  async getCategories() {
    try {
      return await this.categoriesService.getCategories();
    } catch(err) {
      throw new InternalServerErrorException(err, 'Error ocurred trying to retrieve categories');
    }
  }
}