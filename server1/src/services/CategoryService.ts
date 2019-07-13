
import { getRepository } from "typeorm"
import { Categories } from '../entities/Categories';

export class CategoryService {
  private categoryService = getRepository(Categories)

  async get () {
    let categories: Categories[]
    try {
      categories = await this.categoryService.find({
        take: 50
      })
    } catch (error) {
      throw new Error('An error occured while trying to fetch categories. #CSG#1')
    }
  }

  async post (_body) {
    let category: Categories[]
    try {
      category = await this.categoryService.create(_body)
      return category
    } catch (error) {
      throw new Error('An error occured while trying to create a category. #CSG#2')
    }
  }
}