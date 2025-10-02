// src/auth/auth.controller.ts
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { supabase } from 'src/lib/supabaseClient';

@Controller('auth')
export class AuthController {
  @Get('protected')
  async getProtected(@Req() req: Request, @Res() res: Response) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Token ausente' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Token malformado' });
      }

      // ✅ Validamos el token con Supabase Auth
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data?.user) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Token inválido' });
      }

      // ✅ El token es válido, podés usar Prisma si querés acá
      const user = data.user;

      return res.status(HttpStatus.OK).json({
        message: 'Token válido. Bienvenida 🎉',
        user,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        error: message,
      });
    }
  }
}
