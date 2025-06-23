use wasm_bindgen::prelude::*;
use z3::{Config, Context, Solver, Ast};

#[wasm_bindgen]
pub struct Validator {
    ctx: Context,
}

#[wasm_bindgen]
impl Validator {
    pub fn new() -> Self {
        let cfg = Config::new();
        let ctx = Context::new(&cfg);
        Validator { ctx }
    }

    pub fn validate(&self, input: &str) -> Result<bool, JsValue> {
        let x = self.ctx.named_int_const("x");
        let y = self.ctx.named_int_const("y");
        
        let solver = Solver::new(&self.ctx);
        solver.assert(&x.gt(&y));
        
        match solver.check() {
            true => Ok(true),
            false => Ok(false),
        }
    }
}
