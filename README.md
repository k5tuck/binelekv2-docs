# SMB AI Command Platform - Documentation

This repository contains all documentation for the SMB AI Command Platform.

## Structure

```
├── docs/                    # Public documentation
│   ├── api/                 # API reference
│   ├── customers/           # Customer-facing guides
│   │   └── modules/         # Module documentation
│   ├── developers/          # Developer guides
│   ├── integrations/        # Integration documentation
│   └── intro.md             # Introduction
│
├── internal-docs/           # Internal documentation
│   ├── architecture/        # System architecture
│   ├── business/            # Product & business specs
│   └── security/            # Security model
```

## Documentation Categories

### Customer Documentation (`docs/customers/`)
- Getting started guide
- Module-specific documentation (Ops Copilot, Mini Foundry, Marketplace Intel, Cybersecurity Scanner)

### Developer Documentation (`docs/developers/`)
- Architecture overview
- Local development setup
- API reference
- Contributing guidelines
- MCP integration

### Internal Documentation (`internal-docs/`)
- Product vision and roadmap
- Module specifications
- System architecture
- Data flow diagrams
- Security model

## Usage

This repository is included as a submodule in:
- `binelekv2-smb-platform-backend`
- `binelekv2-smb-platform-frontend`

To update documentation in dependent repos:
```bash
git submodule update --remote docs
```
