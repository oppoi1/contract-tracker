import { Contracts } from "../entities/Contracts"
import { getRepository } from "typeorm"
import { Categories } from '../entities/Categories';
import { Companies } from '../entities/Companies';
import { Partners } from "../entities/Partners";

export class CompanyService {
  private contractService = getRepository(Contracts)
  private categoryService = getRepository(Categories)
  private companyService = getRepository(Companies)
  private partnerService = getRepository(Partners)
}