# Database Structure and Logic Documentation

This document provides an overview of the database structure and the logic behind the `contributors`, `new_contributions`, and `research_pools` tables in our application. Each table serves a specific purpose, outlined below.

## Table Schemas

### 1. `contributors`

This table stores information about individuals who contribute data or information to the system.

| Field              | Type                        | Description                                               |
|--------------------|-----------------------------|-----------------------------------------------------------|
| contributor_did    | character varying (not null)| Unique identifier for the contributor (Primary Key).      |
| name               | character varying (255)     | Name of the contributor.                                  |
| registration_date  | timestamp with time zone    | Registration date and time, default to current timestamp. |
| phone_number       | character varying (255)     | Phone number of the contributor.                          |
| country            | character varying (255)     | Country of residence of the contributor.                  |
| age                | integer                     | Age of the contributor.                                   |
| gender             | character varying (50)      | Gender of the contributor.                                |
| medical_conditions | text                        | Description of any medical conditions.                    |
| consent_given      | boolean                     | Indicates if consent was given, default false.            |

### 2. `new_contributions`

This table tracks each contribution made by contributors and is linked to the `contributors` table.

| Field            | Type                        | Description                                                |
|------------------|-----------------------------|------------------------------------------------------------|
| contribution_id  | serial                      | Unique identifier for each contribution (Primary Key).     |
| contributor_did  | character varying           | Contributor's identifier (Foreign Key).                    |
| pool_id          | text                        | Research pool identifier (Foreign Key).                    |
| credential_id    | character varying (not null)| Unique identifier for the associated credential.          |
| test_name        | character varying (not null)| Name of the test or evaluation.                            |
| issuer_id        | character varying           | Identifier of the credential issuer.                       |
| issuer_name      | character varying           | Name of the credential issuer.                             |
| issuer_logo      | text                        | Logo of the issuer.                                        |
| test_result      | jsonb                       | Results of the test in JSONB format.                       |
| submitted_at     | timestamp with time zone    | Submission timestamp, default to current timestamp.        |
| verified_status  | boolean                     | Indicates whether the contribution has been verified.      |

### 3. `research_pools`

This table stores information about different research pools for contributors.

| Field              | Type                        | Description                                    |
|--------------------|-----------------------------|------------------------------------------------|
| pool_id            | text                        | Unique identifier for each pool (Primary Key). |
| created_at         | timestamp with time zone    | Creation timestamp, default to current time.   |
| pool_heading       | character varying (255)     | Heading or title for the pool.                 |
| pool_description   | text                        | Detailed description of the pool.              |
| start_date         | date                        | Start date of the pool.                        |
| end_date           | date                        | End date of the pool.                          |
| funding_amount     | numeric                     | Funding amount allocated to the pool.          |
| currency_unit      | character varying (50)      | Currency unit of the funding.                  |
| contributions_amount| integer                     | Counter for contributions made to the pool.    |
| proof_template     | text                        | Reference or identifier for a proof template.  |

## Database Logic

- **Contributions Tracking**: The `new_contributions` table tracks contributions made by individuals in the `contributors` table to various pools in the `research_pools` table.
- **Data Integrity**: The use of foreign keys (`contributor_did` and `pool_id`) ensures the integrity and proper relational mapping of data.
- **Trigger for Contributions**: The `contributions_after_insert` trigger on the `new_contributions` table calls the `update_contributions_amount()` function to update the `contributions_amount` in the `research_pools` table after each new contribution.
