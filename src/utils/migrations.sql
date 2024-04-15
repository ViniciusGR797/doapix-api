CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE, 
    pwd VARCHAR(255),
    pix_key VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    url_image TEXT,
    description TEXT,
    state VARCHAR(2),
    category VARCHAR(255),
    goal MONEY,
    amount_raised MONEY,
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    txid VARCHAR(255),
    location TEXT,
    qr_code TEXT,
    pix_copy_paste TEXT,
    amount MONEY NOT NULL,
    alias VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    message VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donation_id UUID,
    FOREIGN KEY (donation_id) REFERENCES donations(id)
);













INSERT INTO donations (name, url_image, description, state, category, goal, amount_raised, deadline, user_id)
VALUES (
    'World Wide Fund for Nature',
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBURDw8REREPDw8PDxEPEA8PEREPDw8PGBQZGRgUGBgcIS4lHB4sHxkYJjgnLTU0NjU1GiQ7QDszQC40Nz8BDAwMEA8QHBISGDQhJSExNDQxMTE0NDExNDQ1NDE0NDQ0NDQ0NDQxNDE0MTE0NDQ0NDQ0NDQ0MTQxNDE0NDQ3NP/AABEIAJwBRAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBQYHBP/EAEsQAAIBAwIDBAYGBQkECwAAAAECAAMEEQUSBiExE0FRYQcUIjJxgUJSYnKRshcjM6GxFVNUdIKSlKLTJDWEsxYlJjQ2Q3OTwcPw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAhEQEBAQACAwEAAgMAAAAAAAAAARECIRIxUUEiQgNhcf/aAAwDAQACEQMRAD8A34iAyFZBPLrucQGAmLmPIxC0KNFYRNhzHlTHq3iAmUimZYBGmJiHEZRGxArURxDiTMaGBjZlRaDfJpi0tBEDR1gKyxSs9GINkJqgU5alOWqsjkKMkgDxPITUhoFZU0Iro3IOjHwDKTA4ltSRXHiGTdM61hsxsyvMmY0xZK3gzAxmdXCEwZkJgjTBzATJGVJEIxlbAz2CnD2YlxdeVQY6iX4EmJUVqJaBBiEQJtgxDmBjAWSDMkaHZYhE9BSJsgU7ZYlOWrTlypiWRLVIoyFAJc0qeW4QkBEMBMzqgBDmIzRO0k1cWkxGMXdATGomZJAYwEjQrLViBYwEsZWhpgeJOLbewG2oxq3BAK21Mgvg9Gc9EX48/AGYrjni31NRb25DXlRQc43eroeQbb3ufoj5nuB8XCfAgyLvUQatdzvFvUO8Kx57qufffyPId+T06SdbWb8jGrrGrapztUNtbMcB6Z7JMedZvac/cx8JYvozrVcPdXqM/f8Aq3uW/vuyn906eBgADAAGAByAHgIrR5X8PH65nV9FSY9i7wft2ysP3OJ5+AHq0dVurR61R6dKnXQozMabPTqogZVJO3kW6eM33XNcoWSB69TbuzspqN1SoR1Cr8xzOAM8zNA4MrG61u6uqaOlJkrO27B2Fyu1WI5bicnHkZZbZdMksxlv0gLTu61vdW726JUZFqAl3ChiAzpgHaQAcrnr39ZuFvcpURXpuro43I6EMjL4gieHW9DoXidnXQMQDsqLhatM+Kt/8dD3ic+p1LnQroI+a1lWYnlyV172UH3Kg7x0P4EZycvXtds9uphpN08ttdJVppUpsHp1FDo46Mplu6c9bWbpJXmOpiBtsm2MIwEMgqS1ExFEcNNBojGTdFZo0Aw5iM0TfJq4sLRe0iFopMaq3tIC0pJkLyamG3ySrMkmrjLgQ7YoMYGdHOiIS0EDGXQGaVM0LSlzM2tYLPKy8RjFYzNqyHLRCYu6KXk1cPmTfKi0m6TVWhpcrTyBpajyypY9YM8mtamtpa1rl+YpJlVzje5OEX5sQPnLkeYTjDQn1C2SjTqrRKVlqHepZHAVlwcc+W7Py+c1xs3tK1n0daM13Xq6pd+23at2W4ey9f6VTHgvuqO7B+qJ03Mx+lWS21tRt6fuUaaoCRgsQObHzJyT8Y2o6iltQqV6zbKdNdzHGSckAKB3kkgAeJmuV8qzJke2KTOefpUp78eqVNnj2qdrj7mMf5vnN207Uad1QSvRfdTqAlTjBBBwVI7iCCCPKS8bPayyuaW9supa/cpdFuzovWVaeSu9KLhEpjwByXOPteM6S5o2lAnFK2t6S5OAqU0X4Cc+4/sHs7yhqduNpaovaY90V1HInwVkBU/A97TycT622rVrSztN2x9juGBH65hk7h3qi5J8TnwE6Wbnxnc1uOn8ZWdzWWilRw7nCdpTdFdvAEjr5HGZ79b0tLu3ehUHsuMq4HtU3HuuvmP38x3zn/HXDqWVCzqWqshpsadSpzLvVwHSox7jlW/EDwmxfpBs9isWrM5UFkSk2Q2OYy2B185i8fV4tS/lYTgO/e1uq2m1+R3uaYzyWsvNlX7LL7Y+GfpToWJyHWtaF3qNG5s6NYVk7MhPZapVdHyDtTOOWFPM8gJ18f8A4Sf5J3L9XjfxBHWACMBMKYGOpiAQiUWZkLRMyEzTIlojNDEMy0BaKTCRARAmZN0UwTIJMWQwQqZkhkgZgLDDJmdHMMwGGCFIVlTrLoGgeNliNPU6Sh0mKseZouZaViMsy0QmCNiTEKpuLlKSNUqOqIgyzucKBNcXj+z37c3G3+c7I7PjjO790xPpOrPmzoA4RzUdh3FwUVSfhub8Zn24OtOw7HsU3bdvb/8An7/r7+vXnjp3YxOk48ZJb+sW23I2C1ukqIj03V0cbldDlWE0HjS4uaurULWhcVaO+lTVFSrUooKjs5LNs59w58+knouunxd0Scqhp1FHPCu29Xx4A7Fi8WuaOuWFY8lPqpJ8lrMr/wCUia48fHlYluzXq0LiC7s79LHUXNRKpREd2Duhc4R1fq6FhjnzB8METY/SI6jSbkP9JqIQd5ftkI/gT8AZhPSTpVWp6rdUKbu9uWRxTUu6jcGR8DmQGDfDcPOYqrQ1DWqtNatNra1ptuLFHp00yMFgH5u+CQO4eWTNTLl9M+tjKaVRX/otWNRFP6i7dCyjIbtH2MD47sYPwnt9FqkafUJzg3dQp5DYgOPmDLuO1W10ZqFIbE/2e2QdSEDgkE9+Qh/GevgG27PSrXxdalU/23Zh+7A+Uzyv8bftJO2Yv7NK9J6VVA9Oou10OeY6g5HMEHBBHTExWicM21k7vRRjUcbTUqOXdUznavcB0+OBnpMxdV0pI9SoypTRS7u3JVUdTNI1f0iUVot6qr1KzEqpqoyU0H1yM5byXl54meM5XqNWye25XNutVGp1EWpTYYZHUMrDzBmHXhOxU5FpRPk29x+BOJpdTWNXtUS7rhjbuRlatOiEAY8gyqA6Z7s48/CdB0jUVurajcICi1U3bDzKMCVZc9+CCMxynLjPayysXxDerptk1S2oUEO9EVFQIg3HqQmM9JktGvjcW1vXKhTWpI7KDkKxHMA+GZrXpPr7bKknfUuVP9lUck/iVmd4epmnp9orD2ktaZYfa2AkSWfxlJ7wmtcU21m2yq7NVxu7Kku9wO4t0C/MyaJxVbXj7KTslXGRSqrsdh37eZDfAHM0jgHTkv691c3aiuylH2Pko1SoXLMw78bcAdOfkI3H+lpY1LW5tFFu7M7bE5ItRNrKyju6nI6H8Zvx47n6z5XNdSzGlVN9yq3TcobHhkZjTDZ4DBIYEJgzIYIExJiMJMQKyIMSwiDECvEm2PiTEgTEkfEkYMoYITBNspmAmCAwITATIYpgQmVuITAZMFTLEKy4iDbJi6o2wbZftk2R4muZ+k5f9p0/7tT86TooTn85z/0ori50/wC7U/Ok6UE5/ObvHqJL3XMPRYua1/8AdofmqTI+k/TC9tSuFBzbuUcjORTqYGfk4T+8ZT6LLR0rahvR029ih3qVw4aplefeOX4jxnQLqyStTqUqi7kqoyOvirDB+c1euWszuYxvDGpet2VCvn22TZUA+jWX2XH4jI8iJmBOW8P3r6LqFWzuji1qsD2h90A8kuPgQNreGPszqqjIBGCCMgjmCPGZ5ccqy6x2t6Sl5bvb1dwR8EMhw6ODlXXzHnyM0DhuvW0rVBp1V99vXcBDzCbn9yqg+jlhtYeOeuMzqO2cw1A+u8TUkpjKWr01dh0xQJqOT/bOya4zqypfrZfSHbvU0ysKasxVqbuq8yaasCxx5cm+Cma7wLW05ko70o07+kOb3BxvbJIdCx25x4cxj5zpJE1LWOALW4cum+1diS4o7ezcnqdjAgfLEkzMq2d61rjXUDqF7bafaur0w4DOh3o1c5ySR7wRMnke9vCdAsbJLejTo0wQlJFRc8yQB1PmevzmO4e4St7BmqU99Wsy7e1qlSyqeqoAAFH7/ODi7iBLC3JBVrmoCtCmeftd7sPqr+84HfM8pucYs67rTeMH9f1a2sqfNKRFNyM8mfD1T/ZRR8wROi1FwjADACEAeAxNP9HWhMqvfVgTVuQey3e92bHc1Q+bnn8Bn6U3WomVYDqVIHxxHL8k/Cffrnnol9y8+Fr/AAqSz0s/srT71f8AIkb0U27ol4XR0G6gntKV9tRU3Lz7xkZ+MHpa/ZWn3q/5Emv7s/1b7b+5T+4n5RLIlsP1afcT8olgEw6JDiQCMBIFxBiWYgxNMhJDiDEmCRcRpMRjRMSYj4gxGBMSR8Qxia98EkkrKYgxGkjDSERSstxAVlw1SVilZeVg2y+JqnbJsl22ELLhqkJGCS4JCEjxTXLfSsuLrTvu1fz0508pzPxnNPS77NxpzHkoSsSfg9MmdRxzz55m7Oozvbm+v8aXDXbWem0hVqUyyPUKGqzOvJgq5wqqeRZu8HpyJr0rjq4t7kW+q0RSBx+tCGm9PPR2XmHTr7S9Md8x/Ct6ul6veULsbBVZqYrv0TL70cn6jgg57jjPQ46FxPw3S1Gh2b4SomWoV1GWpufzIeWV7/IgGXJ8Ta8/E/DlLUbcKWVaijdb3C4fYWAPd7yNyyPgRzAmjaNxDc6NUFlf03e3H7MqdzImfepMeTp9nkRnu92XcNcQVtIuDp2ogrbg+w/NhQBPJ0P0qR/y8+mCJ0jUNOoXdHs6yJXpOAy55jmOTow5g46EGMzo1VpWqULtO0t6qVk5Z2n20Pg6nmp8iJzjhuoLTiO8p18Ibh7imjtyG6pVWqnP7S4HxIEzI9GopXVGvaXdSiiVFdkdd1QIGBKq6kZBxjBHxzMnxvwcuoKKtIrTvKa7UZuSVVGSEcjmOZOG7smMi7WylYrLOZ291r6ItFaNRtg2Co6UHcgdMuxw3xOc+JkbhTVr7AvLns6ZHtJUqhx/7VL2D8yJnx/2vkzfEvHVvah0osl1cDIwjZoUz4u45HH1Rz8cTA8O8LVr+v69qe4oxDJRqDa1YD3QV+hTHcvf8Cc7ToHAttaFXINzXXmKlYDajeKJ0X4nJHjPRxZxJT0+llsPcOD2NHPNj9dvBB49/QSeuof9U8UcRU9PpAsA9ZwexoA7S2PpMfooPH5CaaeKtVFP1o26eq+9n1dhS2Z653btv2uk9PCnDNTUKx1HUcujkPTpuMdvj3SV+jSHcv0vh12/izWKVnauam1nqo9OjR5ZqMVxjHcgzzPh5kCMk6zV23tOG9cW/tlrIuxwxSrTJ3GnUABIz3gggg+B7uc1H0ufsbT71f8AKk93ossHSzrVXDBK9Vezz9NEXBceRJI/szw+l1gKdmvfm4bHkFQZ/eJJM5dFuxvtsPYT7ifwEtxFtkwiZ7kUfPAluJjGgAhhAhxGASYhxDiXAuJMR8SbYwJiTEs2ybYwJiDEsxBiMCYkjSSYL44gxDNYyOJJBCBLIamJMRgIcS4yTEG2WYkxLhpMQhY+IQJcChYcRsQ4lwaX6TNDa7sRUpqXq2jNVCKNzPSK4dQO84Ctjv2Y743o/wCKUvbdKFRwLyhTVXUkfr6agAVU8eWN3gfIiblic0434OejU/lLTd1OpTbtatKjyZG6mtSH47l6EE8uoNGzcX8K09Ro91O5pg9jXx0+w/ih/d1HfnUuEOKalhW/k3U9yKjBKdVznsPqozd9M/Rbu+HTZ+COME1GlsfYl4ibqlNeS1V/naf2emR1UnwIJ93EvCtvqKp24ZXQ+zWolUqbc80JIIKnzHLuxCDxRw3S1Gh2b+xUTLUK6jL0nP5lPLK9/kQDNF4S1yvpl2NLvwRSLhKTk7los59hkbvpMf7pPdggdSo0lREpqMIiKijJOFUYAz8BOf8Aph09Wtba4wN9Ot2BbvNN0Y4+TIPxPjE+K6FiCY/h27avYWdZ+b1bak7nxcoNx/HMyEgBEXEYwSDBcWa+mn2prMu+o7bKNPON9QjPPwUAEn4Y6kTSOEuGKmo1v5S1El0ch6dN+XrGPdJX6NIdy/S+HVvSGputZ0+zb9ntoqRkj9tWIc/3UX8J09KYUBVAVVAVVAwFUDAA8pfUGE4l1+lp9DtKntO2Vo0FID1HA6DwUcsnu+JAmh8PaDW1i4N/fk+rZ9hOaiqAeSIPo0x3nv59+TN717hS3vq1CrX7QmgCuxHCpUQnOxxjOM+BBmWqOlGmWYpSo0kyScIlNFH4AATPr0e1VVko0yzFKVGkmSThEpoo/AACcrrVjrmr0wit6nbYJLDH6hWyzMO4uRtA64x4GWaxqtfXboWdoGSzpsHZmBCsoP7er5fVTrnrz93oehaHSsaC0aIP1nqNjfWfHN2P8B0A5RmLuvdtk2y3bJtmca1VtkxLMQ7Yw1XiHbLAsO2MTVYWMFjhYdsuGk2ybZZtk2xiaqIikS4rEKyYuqsQx9skYurcSYjAQ4lxnSgRgIcQiXEQCHEIEIE1gXEOIcSYlwQCTEOIZcAxJiNiDEiBiQCHEOIHMuOODno1DqWm7qdSm3bVaNHkyN1NakPx3L0OTy5kHP8AA/F6ajS2PtS9RM1KY5LVX+dp/Z6ZH0SfAgnbScd+PnNU/wChNsupU9Qps9Flc1Gt6eBSeqVYFh3qDuOQOR8snOhtM0j0s/7sX+tUvyvN2LjxH4zSPSw2dMXp/wB6pfleZVnOC/8AdWn/ANVpflmZMwnBh/6q0/8AqtL8szWIEMGZMSbZMHL+Jz/2nsP+E/5jzpxacx4n/wDE9h/wn/MedO5eI/GWpFVzcLTR3qOqIil3dyFVFAySSegnKNY1S4126FpaBks6bB2ZwQpUH9vV8vqp1z5+70jiTRUv7V7Z6jUg7IwdMMQyMGGQeo5dIeH9Do2FAUaI+09RsdpVfHN3P8B0A6STpSaDoVKxoLRoj7VSo2N9Z8c3Y/wHQDkJlNscLDtkwV7ZNss2w4lw1Vtk2y3EmIw1WFhxLMSYjAoWTEfEmIwLiTEfEmIwVlYpWWwESYKdsMsxJGGmxJiNiSawDEmIcwiMAAjYkEbEIXEOI0k0FxDiGSECSGSAIV6j4w4gEDgfC3Cx1atd5rik9LZUd3pGu1RnZ8k+2uD7PXn1myfogP8ATqf+DP8AqTbeDeD/AOTHu37ft/WSgQbNmymhcjPM7m9vryHKbSRA5R+iI/06n/gz/qQj0RsOl8g+FoR/9k6riTEiuP8AAdgbTX69qKm/s6Vem7qpQVNuwglcnv8AMzruJrNhwl2Wr3GpdvuWsr7aHZ4ZHcKGJfdzHsnHLv8ALntOIoTEwnGjFdKvypKsLZ8MpKkZ5HBHlM9ieHW9O9btLi237O3pPTD7d2wkcmxkZ590g4/wtwAdQtRcLdJQU1KlPszbmp7uOed6+PhMv+iE/wBOp/4M/wCpN94S0E6fZpbGoKzB3dnCbFLMegXJ5AY75msS6jlH6IT/AE6n/gz/AKkD+iMhSfXaZwCceqHngf8AqTrGIrpkEHoQQfgY1XMfQu5NO/XJCBrZ1TPsqzLU3EDxO1fwE6bia1wRwl/JaXCmv6wa708EU+zCogYKCMnLe0c/KbPiUhcQ4hxJiZAxJiHEmIAxJiHEOIC4kxGxJiAuJMRsSYgLiTEaDEuBcSRsSRil2yBY8kqFCxgIRGECASYhhhAxJiGSAMSYhkgCSGSBIIZIC4kjQQFxJiGSAMSQyQBJiGSAMSYhkgDEGIZIAxJiGSAMSYhkgDEOIZIAxJDJAEkMkASQyQBiDEaCAuJI0kK//9k=',
    'Dia 24, ONG internacional trabalha na área de preservação da natureza e redução do impacto humano no meio ambiente ONG internacional trabalha na área de preservação da natureza e redução do impacto humano no meio ambiente ONG internacional trabalha na área de preservação da natureza e redução do impacto humano no meio ambiente ONG internacional trabalha na área de preservação da natureza e redução do impacto humano no meio ambiente',
    'AC',
    'Projetos Sociais / Voluntariado',
    500.00,
    3.00,
    '2024-03-24T19:34:02.090Z',
  	'8513a7f4-24cc-4258-a29b-cabbd089283e'
);

INSERT INTO donations (name, url_image, description, state, category, goal, amount_raised, deadline, user_id)
VALUES (
    'Cirurgia Urgente',
    'data:image/jpeg;base64,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',
    'Dia 29, Fui diagnosticada com uma condição que requer uma cirurgia urgente. Infelizmente, o custo da cirurgia está além ...',
    'MG',
    'Saúde / Tratamentos',
    8000.00,
    7000.00,
    '2024-03-24T19:34:02.090Z',
  	'8513a7f4-24cc-4258-a29b-cabbd089283e'
);

