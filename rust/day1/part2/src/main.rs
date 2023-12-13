fn main() {
    let contents = include_str!("data.txt");

    const NUMBERS: &[&str] = &[
        "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    ];

    let mut total = 0;
    for line in contents.lines() {
        let mut first_number = None;
        let mut last_number = None;

        for (i, c) in line.chars().enumerate() {
            if c.is_numeric() {
                match first_number {
                    Some(_) => {}
                    None => {
                        first_number = Some(c);
                    }
                }
                last_number = Some(c);
            } else {
                let sub_string = line[i..].to_string();

                for (i, number) in NUMBERS.iter().enumerate() {
                    if sub_string.starts_with(number) {
                        match first_number {
                            Some(_) => {}
                            None => {
                                first_number = Some(format!("{}", i + 1).parse::<char>().unwrap())
                            }
                        }
                        last_number = Some(format!("{}", i + 1).parse::<char>().unwrap())
                    }
                }
            }
        }
        let combined_number =
            format!("{}{}", first_number.unwrap(), last_number.unwrap()).parse::<i32>();
        total += combined_number.unwrap();
    }

    println!("Total: {}", total);
}
