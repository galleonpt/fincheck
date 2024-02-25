import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly transactionsRepository: TransactionsRepository,
        private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
        private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
        private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    ) {}

    async create(userId: string, createTransactionDto: CreateTransactionDto) {
        const { bankAccountId, categoryId, date, name, type, value } =
            createTransactionDto;

        await this.validateEntitiesOwnerShip({
            userId,
            bankAccountId,
            categoryId,
        });
        return this.transactionsRepository.create({
            data: {
                userId,
                categoryId,
                bankAccountId,
                date,
                name,
                type,
                value,
            },
        });
    }

    findAllByUserId(userId: string) {
        return this.transactionsRepository.findMany({
            where: {
                userId,
            },
        });
    }

    async update(
        userId: string,
        transactionId: string,
        updateTransactionDto: UpdateTransactionDto,
    ) {
        const { bankAccountId, categoryId, date, name, type, value } =
            updateTransactionDto;

        await this.validateEntitiesOwnerShip({
            userId,
            bankAccountId,
            categoryId,
            transactionId,
        });

        return this.transactionsRepository.update({
            where: {
                id: transactionId,
            },
            data: {
                bankAccountId,
                categoryId,
                date,
                name,
                type,
                value,
            },
        });
    }

    async remove(userId: string, transactionId: string) {
        await this.validateEntitiesOwnerShip({
            userId,
            transactionId,
        });

        await this.transactionsRepository.delete({
            where: {
                id: transactionId,
            },
        });
    }

    private async validateEntitiesOwnerShip({
        bankAccountId,
        categoryId,
        userId,
        transactionId,
    }: {
        userId: string;
        bankAccountId?: string;
        categoryId?: string;
        transactionId?: string;
    }) {
        await Promise.all([
            transactionId &&
                this.validateTransactionOwnershipService.validate(
                    userId,
                    transactionId,
                ),
            bankAccountId &&
                this.validateBankAccountOwnershipService.validate(
                    userId,
                    bankAccountId,
                ),
            categoryId &&
                this.validateCategoryOwnershipService.validate(
                    userId,
                    categoryId,
                ),
        ]);
    }
}
