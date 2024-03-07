import { PartialType } from '@nestjs/swagger';
import { CreateFreezeDto } from './create-freeze.dto';

export class UpdateFreezeDto extends PartialType(CreateFreezeDto) {}
