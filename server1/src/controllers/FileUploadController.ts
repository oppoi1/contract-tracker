import { NextFunction, Request, Response, request } from 'express'
import { Fileupload } from '../entities/Fileupload';
import { getRepository } from "typeorm"
import { ContractService } from '../services/ContractServices';
import { FileUploadService } from '../services/FileUploadService';

export class FileUploadController {
  private fileUploadService = getRepository(Fileupload)
  private fileService = new FileUploadService()
  private contractService = new ContractService()

  /**
   * Upload file to folder and write to database
   * @param  {Request} request files and params
   * @param  {Response} response
   * @param  {NextFunction} next
   */
  async upload(request: Request, response: Response, next: NextFunction) {
    // console.log(request.files) // fieldname, originalname encoding, mimetype, destination, filename, path, size
    // console.log(request.params) // contractid
    // console.log(request.body)
  
    const files = request.files
    const { contractId } = request.params
    let contract: import("../entities/Contracts").Contracts

    // find contract
    try {
      contract = await this.contractService.getOne(contractId)
    } catch (error) {
      response.status(500).send({
        error: 'Contract not found.'
      })
    }

    // save files
    // TODO: save userId!
    try {
      files.forEach((files: { fieldname: string; originalname: string; encoding: string; mimetype: string; destination: string; filename: string; path: string; size: string; }) => {
        let fileupload = new Fileupload()
        fileupload.contract = contract[0]
        fileupload.fieldname = files.fieldname
        fileupload.originalname = files.originalname
        fileupload.encoding = files.encoding
        fileupload.mimetype = files.mimetype
        fileupload.destination = files.destination
        fileupload.filename = files.filename
        fileupload.path = files.path
        fileupload.size = files.size
  
        this.fileUploadService.save(fileupload)
      }); 
    } catch (error) {
      return response.status(500).send({
        error: 'No files found.'
      })
    }
    // return success
    return response.status(200).send({
      success: 'success.'
    })
  }
}