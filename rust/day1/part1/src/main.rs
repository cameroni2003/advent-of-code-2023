fn main() {
    let contents = include_str!("data.txt");

    let mut total = 0;
    for line in contents.lines() {
        let mut first_number = None;
        let mut last_number = None;

        for c in line.chars() {
            if c.is_numeric() {
                match first_number {
                    Some(_) => {}
                    None => {
                        first_number = Some(c);
                    }
                }
                last_number = Some(c);
            }
        }

        let combined_number =
            format!("{}{}", first_number.unwrap(), last_number.unwrap()).parse::<i32>();
        total += combined_number.unwrap();
    }

    println!("Total: {}", total);
}
