import { ICustomerRepository } from '../../../domain/customer/repositories/ICustomerRepository';
import { IInputListCustomerDto, IOutputListCustomerDto } from './dtos';
import { OutputMapper } from './util/OutputMapper';

export class ListCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: IInputListCustomerDto): Promise<IOutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}
