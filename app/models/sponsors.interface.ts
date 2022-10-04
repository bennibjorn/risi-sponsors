export interface SponsorLogo {
    dimensions: {
        width: number
        height: number
    }
    url: string
}

export interface Sponsor {
    logo: SponsorLogo
    valid_from: string
    valid_to: string
    enabled: boolean
}