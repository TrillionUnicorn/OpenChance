import { pgTable, text, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { challenges } from './challenges';

/**
 * Payments Table
 * Stores all payment transactions
 */
export const payments = pgTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  // References
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'set null' }),
  
  payerId: text('payer_id')
    .references(() => users.id, { onDelete: 'set null' })
    .notNull(),
  
  payeeId: text('payee_id')
    .references(() => users.id, { onDelete: 'set null' }),
  
  // Payment Details
  amount: integer('amount').notNull(), // in cents
  currency: text('currency').default('usd').notNull(),
  
  paymentType: text('payment_type', {
    enum: ['challenge-payment', 'subscription', 'platform-fee', 'refund', 'payout']
  }).notNull(),
  
  // Stripe Integration
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeChargeId: text('stripe_charge_id'),
  stripeRefundId: text('stripe_refund_id'),
  
  // Status
  status: text('status', {
    enum: ['pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded']
  }).default('pending').notNull(),
  
  // Escrow
  escrowStatus: text('escrow_status', {
    enum: ['held', 'released', 'refunded']
  }),
  escrowReleasedAt: timestamp('escrow_released_at'),
  
  // Platform Fee
  platformFeeAmount: integer('platform_fee_amount'), // in cents
  platformFeePercentage: integer('platform_fee_percentage'), // e.g., 10 for 10%
  
  // Metadata
  description: text('description'),
  metadata: jsonb('metadata'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  succeededAt: timestamp('succeeded_at'),
  failedAt: timestamp('failed_at'),
  refundedAt: timestamp('refunded_at'),
});

/**
 * Milestones Table
 * Tracks milestone payments for challenges
 */
export const milestones = pgTable('milestones', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' })
    .notNull(),
  
  paymentId: text('payment_id')
    .references(() => payments.id, { onDelete: 'set null' }),
  
  // Milestone Details
  name: text('name').notNull(),
  description: text('description'),
  amount: integer('amount').notNull(), // in cents
  order: integer('order').notNull(),
  
  // Status
  status: text('status', {
    enum: ['pending', 'in-progress', 'submitted', 'approved', 'rejected', 'paid']
  }).default('pending').notNull(),
  
  // Deliverables
  deliverables: jsonb('deliverables').$type<{
    name: string;
    url: string;
    submittedAt: string;
  }[]>(),
  
  // Timestamps
  dueDate: timestamp('due_date'),
  submittedAt: timestamp('submitted_at'),
  approvedAt: timestamp('approved_at'),
  rejectedAt: timestamp('rejected_at'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Invoices Table
 * Stores generated invoices
 */
export const invoices = pgTable('invoices', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  paymentId: text('payment_id')
    .references(() => payments.id, { onDelete: 'cascade' })
    .notNull(),
  
  invoiceNumber: text('invoice_number').unique().notNull(),
  
  // Invoice Details
  amount: integer('amount').notNull(), // in cents
  currency: text('currency').default('usd').notNull(),
  
  // PDF
  pdfUrl: text('pdf_url'),
  
  // Status
  status: text('status', {
    enum: ['draft', 'sent', 'paid', 'cancelled']
  }).default('draft').notNull(),
  
  // Timestamps
  issuedAt: timestamp('issued_at'),
  dueDate: timestamp('due_date'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Payouts Table
 * Tracks payouts to solvers
 */
export const payouts = pgTable('payouts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  amount: integer('amount').notNull(), // in cents
  currency: text('currency').default('usd').notNull(),
  
  // Stripe Integration
  stripePayoutId: text('stripe_payout_id'),
  stripeTransferId: text('stripe_transfer_id'),
  
  // Status
  status: text('status', {
    enum: ['pending', 'processing', 'paid', 'failed', 'cancelled']
  }).default('pending').notNull(),
  
  // Bank Details (encrypted)
  bankAccountLast4: text('bank_account_last4'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  paidAt: timestamp('paid_at'),
  failedAt: timestamp('failed_at'),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Milestone = typeof milestones.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Payout = typeof payouts.$inferSelect;

