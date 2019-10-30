import { getRepository } from "typeorm";
import { Fileupload } from "../entities/Fileupload";

export class FileUploadService {
  private fileRepo = getRepository(Fileupload)
  /**
   * Find all files for one contract
   * @param  {number} id contract ID
   */
  async getFilesForOneContract(id: number) {
    try {
      return await this.fileRepo.query(`
      SELECT *
      FROM 
      Fileupload
      WHERE 
      contractId = ${id}
      `)

    } catch (error) {
      throw new Error(`No contract files found with id: ${id} #CS2`)
    }
  }

   /**
   * Find one file for one contract
   * @param  {number} id file id
   */
  async getFile(id: number) {
    try {
      return await this.fileRepo.query(`
      SELECT *
      FROM 
      Fileupload
      WHERE 
      id = ${id}
      `)
    } catch (error) {
      throw new Error(`No contract files found with id: ${id} #CS2`)
    }
  }
}